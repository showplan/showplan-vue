<template>
    <div>
        <div v-if="statement !== undefined">
            <h1>
                <span class="statementType">{{ statement.StatementType }}</span> <select-plan
                    :show-plan="showPlan"
                    @showplan-statement-changed="selectChanged"
                />
                <span
                    v-if="statement.QueryPlan !== undefined"
                    class="stats"
                >
                    <span v-if="statement.StatementSubTreeCost !== undefined">Sub Tree Cost: <strong>{{ statement.StatementSubTreeCost }}</strong></span>
                    <span v-if="statement.StatementEstRows !== undefined">Estimated Number of Rows : <strong>{{ statement.StatementEstRows }}</strong></span>
                    <span>Degree of Parallelism:
                        <strong v-if="statement.QueryPlan.DegreeOfParallelism !== undefined">{{ statement.QueryPlan.DegreeOfParallelism }}</strong>
                        <strong v-else>1</strong>
                    </span>
                    <span v-if="statement.QueryPlan.CachedPlanSize !== undefined">Cached Plan Size: <strong>{{ statement.QueryPlan.CachedPlanSize | filterKiloBytes }}</strong></span>
                </span>
            </h1>

            <div
                class="card"
                style="margin-bottom:2rem"
            >
                <smooth-reflow>
                    <component
                        :is="selectedOverviewTab"
                        :statement="statement"
                    />
                </smooth-reflow>
                <div class="footer">
                    <div class="buttons">
                        <a
                            :class="{ 'selected': selectedOverviewTab === 'highlight-sql-statement' }"
                            @click="selectedOverviewTab='highlight-sql-statement'"
                        >Query Text</a>
                        <a
                            :class="{ 'selected': selectedOverviewTab === 'statement-overview' }"
                            @click="selectedOverviewTab='statement-overview'"
                        >Query Properties</a>
                        <span v-if="statement.QueryPlan !== undefined">
                            <a
                                v-if="statement.QueryPlan.ParameterList !== undefined && statement.QueryPlan.ParameterList.length > 0"
                                :class="{ 'selected': selectedOverviewTab === 'query-parameters' }"
                                @click="selectedOverviewTab='query-parameters'"
                            >
                                Query Parameters
                            </a>
                            <a
                                v-if="statement.QueryPlan.OptimizerStatsUsage !== undefined"
                                :class="{ 'selected': selectedOverviewTab === 'statistics-list' }"
                                @click="selectedOverviewTab='statistics-list'"
                            >
                                Statistics Usage
                            </a>
                            <a
                                v-if="statement.QueryPlan.MissingIndexes !== undefined"
                                :class="{ 'selected': selectedOverviewTab === 'missing-indexes' }"
                                @click="selectedOverviewTab='missing-indexes'"
                            >
                                <font-awesome-icon
                                    :icon="warningIcon"
                                    style="color:var(--orange)"
                                />
                                Missing Indexes
                            </a>
                        </span>
                    </div>
                </div>
            </div>

            <div
                v-if="statement.QueryPlan !== undefined"
                class="queryplan"
            >
                <div class="visualization card">
                    <component
                        :is="selectVisualizationTab"
                        :statement="statement"
                        :selected-node="displayedOp"
                        @rel-op-selected="relOpSelected"
                        @rel-op-highlighted="relOpHighlighted"
                        width="600"
                    />
                    <div class="footer">
                        <div class="buttons">
                            <a
                                :class="{ 'selected': selectVisualizationTab === 'operator-flow' }"
                                @click="selectVisualizationTab='operator-flow'"
                            >Operator Flow</a>
                            <a
                                :class="{ 'selected': selectVisualizationTab === 'data-flow' }"
                                @click="selectVisualizationTab='data-flow'"
                            >Data Flow</a>
                            <a
                                :class="{ 'selected': selectVisualizationTab === 'cost-analysis' }"
                                @click="selectVisualizationTab='cost-analysis'"
                            >Cost Analysis</a>
                        </div>
                    </div>
                </div>
                <div class="details">
                    <div
                        v-if="displayedOp !== undefined"
                        class="opSummary"
                    >
                        <operation-summary
                            :statement="statement"
                            :operation="displayedOp"
                        />
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script lang='ts'>
import {
    Vue, Component, Prop, Watch,
} from 'vue-property-decorator';
import {
    BaseStmtInfo, RelOp, StmtSimple, ShowPlanXML,
} from 'showplan-js';

import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import { faExclamationCircle } from '@fortawesome/free-solid-svg-icons';
import SmoothReflow from './helpers/SmoothReflow.vue';
import CostAnalysis from './visualizations/CostAnalysis.vue';
import OperatorFlow from './visualizations/OperatorFlow.vue';
import DataFlow from './visualizations/DataFlow.vue';
import HighlightSqlStatement from './statement/HighlightSqlStatement.vue';
import OperationSummary from './operation/OperationSummary.vue';
import SelectPlan from './SelectPlan.vue';
import StatementOverview from './statement/StatementOverview.vue';
import MissingIndexes from './statement/MissingIndexes.vue';
import StatisticsList from './statement/StatisticsList.vue';
import QueryParameters from './statement/QueryParameters.vue';
import { allFilters } from '../filters';

@Component({
    components: {
        FontAwesomeIcon, SmoothReflow, CostAnalysis, OperatorFlow, DataFlow, HighlightSqlStatement, OperationSummary, SelectPlan, MissingIndexes, StatementOverview, StatisticsList, QueryParameters,
    },
    data() {
        return {
            selectedOpId: undefined,
            highlightedOpId: undefined,
            warningIcon: faExclamationCircle,
            statement: undefined,
        };
    },
    filters: {
        ...allFilters,
    },
})
export default class Statement extends Vue {
    @Prop() public showPlan!: ShowPlanXML;

    private statement: BaseStmtInfo | undefined;

    private operationMap: Map<number, RelOp> = new Map<number, RelOp>();

    private selectedOpId: number | undefined;

    private highlightedOpId: number | undefined;

    private selectedOverviewTab: string = 'highlight-sql-statement';

    private selectVisualizationTab: string = 'operator-flow';

    public selectChanged(statementGuid: string) {
        const newStatement = this.showPlan.GetStatementByGuid(statementGuid);
        if (newStatement !== undefined) {
            this.statement = newStatement;
        }
    }

    public mounted() {
        this.setDefaultStatement();
        if (this.statement !== undefined) {
            this.buildMap(this.statement);
        }
    }

    @Watch('showPlan')
    private OnShowPlanChanged() {
        this.setDefaultStatement();
    }

    @Watch('statement')
    private OnStatementChanged(val: BaseStmtInfo) {
        this.buildMap(val);
    }

    private setDefaultStatement(): void {
        const statements = this.showPlan.Batches
            .map(i => i.Statements)
            .reduce((flat, i) => flat.concat(i));

        const firstStatement = statements.find(i => i !== undefined && i.StatementType !== 'USE DATABASE');
        if (firstStatement !== undefined) {
            this.statement = firstStatement;
        } else {
            const firstElement = statements.slice(0, 1).pop();
            if (firstElement !== undefined) {
                this.statement = firstElement;
            } else {
                throw Error('Could not find statement in query plan');
            }
        }
    }

    private buildMap(val: BaseStmtInfo) {
        this.selectedOpId = undefined;
        this.operationMap = new Map<number, RelOp>();

        const statement = val as StmtSimple;
        if (statement.QueryPlan === undefined) {
            return;
        }
        const addChildren = (map: Map<number, RelOp>, op: RelOp) => {
            map.set(op.NodeId, op);
            op.Action.RelOp.forEach((childOp) => {
                addChildren(map, childOp);
            });
        };

        addChildren(this.operationMap, statement.QueryPlan.RelOp);
    }

    private get displayedOp(): RelOp | undefined {
        if (this.highlightedOpId !== undefined) {
            return this.operationMap.get(this.highlightedOpId);
        }

        if (this.selectedOpId === undefined) {
            return undefined;
        }

        return this.operationMap.get(this.selectedOpId);
    }

    private relOpSelected(op: number) {
        this.selectedOpId = op;
    }

    private relOpHighlighted(op: number) {
        this.highlightedOpId = op;
    }
}
</script>

<style lang="scss" scoped>
  .queryplan {
    display: flex;

    .visualization {
      flex: 2;
      max-width:66%;
      margin-right:1rem;
      height:100%;
    }

    .details {
      flex: 1;
      max-width:33%;
    }
  }


  h1 {
    .stats {
      font-weight: normal;
      font-size: .8rem;

      span {
        margin-left: .5rem;
        border-right: 1px solid var(--grey);
        padding-right: .5rem;
      }

      span:last-child {
        border-right: none
      }
    }
  }
</style>

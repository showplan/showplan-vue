<template>
    <component
        :is="additionalInfoComponent"
        v-if="additionalInfoComponent !== undefined"
        :operation="operation"
    />
</template>
<script lang="ts">

import { Vue, Component, Prop } from 'vue-property-decorator';

import * as ShowPlan from 'showplan-js';

import SortBy from './operations/SortByView.vue';
import IndexScan from './operations/IndexScanView.vue';
import FilterOp from './operations/FilterView.vue';
import ComputeScalarOp from './operations/ComputeScalarView.vue';
import StreamAggregateOp from './operations/StreamAggregateView.vue';
import HashOp from './operations/HashView.vue';
import BatchHashTableBuildOp from './operations/BatchHashTableBuildView.vue';
import ConcatOp from './operations/ConcatView.vue';
import TopOp from './operations/TopView.vue';
import NestedLoop from './operations/NestedLoopView.vue';
import UpdateOp from './operations/UpdateView.vue';
import InsertOp from './operations/InsertView.vue';
import MergeJoinOp from './operations/MergeJoinView.vue';
import AdaptiveJoinOp from './operations/AdaptiveJoinView.vue';
import ParallelismOp from './operations/ParallelismView.vue';
import SegmentOp from './operations/SegmentView.vue';
import TableValuedFunctionOp from './operations/TableValuedFunctionView.vue';
import CollapseOp from './operations/CollapseView.vue';
import SpoolOp from './operations/SpoolView.vue';
import SplitOp from './operations/SplitView.vue';
import RemoteOp from './operations/RemoteView.vue';

@Component({
    components: {
        SortBy,
        IndexScan,
        FilterOp,
        ComputeScalarOp,
        StreamAggregateOp,
        HashOp,
        BatchHashTableBuildOp,
        ConcatOp,
        TopOp,
        NestedLoop,
        UpdateOp,
        InsertOp,
        MergeJoinOp,
        AdaptiveJoinOp,
        ParallelismOp,
        SegmentOp,
        TableValuedFunctionOp,
        CollapseOp,
        SpoolOp,
        SplitOp,
        RemoteOp,
    },
})
export default class AdditionalOperationComponent extends Vue {
    @Prop() public statement!: ShowPlan.BaseStmtInfo;

    @Prop() public operation!: ShowPlan.RelOp;

    public get additionalInfoComponent(): string | undefined {
        switch (this.operation.Name) {
            case 'Sort':
                return 'sort-by';
            case 'IndexScan':
                return 'index-scan';
            case 'Filter':
                return 'filter-op';
            case 'ComputeScalar':
                return 'compute-scalar-op';
            case 'StreamAggregate':
                return 'stream-aggregate-op';
            case 'Hash':
                return 'hash-op';
            case 'BatchHashTableBuild':
                return 'batch-hash-table-build-op';
            case 'Concat':
                return 'concat-op';
            case 'Top':
                return 'top-op';
            case 'NestedLoops':
                return 'nested-loop';
            case 'Update':
                return 'update-op';
            case 'CreateIndex':
                return 'insert-op';
            case 'Merge':
                return 'merge-join-op';
            case 'AdaptiveJoin':
                return 'adaptive-join-op';
            case 'Parallelism':
                return 'parallelism-op';
            case 'Segment':
                return 'segment-op';
            case 'TableValuedFunction':
                return 'table-valued-function-op';
            case 'Collapse':
                return 'collapse-op';
            case 'Spool':
                return 'spool-op';
            case 'Split':
                return 'split-op';
            case 'Remote':
                return 'remote-op';
            default:
                return undefined;
        }
    }
}
</script>

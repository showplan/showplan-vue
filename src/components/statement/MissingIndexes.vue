<template>
    <div class="content">
        <table class="data">
            <thead>
                <tr><th>Impact</th><th>Index</th></tr>
            </thead>
            <tbody>
                <tr
                    v-for="(indexGroup, indexGroupIndex) in statement.QueryPlan.MissingIndexes.MissingIndexGroup"
                    :key="indexGroupIndex"
                >
                    <td>{{ indexGroup.Impact | filterSigfig }}</td>
                    <td>
                        <list-or-div
                            :data="indexGroup.MissingIndex"
                            list-class=""
                            div-class=""
                        >
                            <template slot-scope="{ item }">
                                <code><sql-string :sql="item.toCreateIndexString()" /></code>
                            </template>
                        </list-or-div>
                    </td>
                </tr>
            </tbody>
        </table>
    </div>
</template>

<script lang='ts'>
import {
    Vue, Component, Prop,
} from 'vue-property-decorator';
import { BaseStmtInfo } from 'showplan-js';
import { allFilters } from '../../filters';
import ListOrDiv from '../helpers/ListOrDiv.vue';
import SqlString from '../operation/operations/SqlString.vue';

@Component({
    components: { ListOrDiv, SqlString },
    filters: { ...allFilters },
})
export default class MissingIndexes extends Vue {
  @Prop() public statement!: BaseStmtInfo;
}
</script>

<style lang="scss" scoped>

</style>

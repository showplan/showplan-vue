<template>
    <div>
        <defined-values
            v-if="batchHashTableBuild.DefinedValues !== undefined && batchHashTableBuild.DefinedValues.length > 0"
            :defined-values="batchHashTableBuild.DefinedValues"
        />
        <div
            v-if="batchHashTableBuild.BitmapCreator !== undefined"
            class="content"
        >
            <div>Bitmap Creator: <strong>{{ batchHashTableBuild.BitmapCreator }}</strong> </div>
        </div>
    </div>
</template>

<script lang='ts'>
import {
    Vue, Component, Prop,
} from 'vue-property-decorator';
import { RelOp, BatchHashTableBuild } from 'showplan-js';

import DefinedValues from './DefinedValues.vue';
import SqlString from './SqlString.vue';

@Component({
    components: { DefinedValues, SqlString },
})
export default class BatchHashTableBuildView extends Vue {
  @Prop() public operation!: RelOp;

  private get batchHashTableBuild(): BatchHashTableBuild {
      return this.operation.Action as BatchHashTableBuild;
  }
}
</script>

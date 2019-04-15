<template>
    <span
        v-if="value !== undefined"
        :class="{ 'on': value === true }"
        class="pill"
    ><slot /></span>
</template>

<script lang='ts'>
import {
    Vue, Component, Prop,
} from 'vue-property-decorator';

@Component({
})
export default class BoolPill extends Vue {
  @Prop() public value?: boolean;
}
</script>

<style lang="scss" scoped>

</style>

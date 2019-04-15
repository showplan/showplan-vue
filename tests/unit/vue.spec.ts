import { mount } from '@vue/test-utils';
import * as fs from 'fs';
import { ShowPlanParser } from 'showplan-js';
import Statement from '../../src/components/Statement.vue';

describe('we can mount app.vue', (): void => {
    test('actually works', (): void => {
        const file = 'tests/unit/adaptive-join.sqlplan';
        const data = fs.readFileSync(file, 'utf16le');
        const plan = ShowPlanParser.Parse(data);

        const statement = plan.Batches[0].Statements[0];
        expect(statement).toBeDefined();

        const wrapper = mount(Statement,
            {
                propsData: {
                    showPlan: plan,
                },
            });

        expect(wrapper.isVueInstance).toBeTruthy();
    });
});

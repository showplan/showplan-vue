import * as ShowPlan from 'showplan-js';

export class ParentRelOpAction extends ShowPlan.RelOpAction {
}

export class ParentRelOp extends ShowPlan.RelOp {
    public constructor() {
        super('Fake', new ParentRelOpAction(), 0, 0, 0, 0, 0, 0, 0, 'Root', 0, false, 'Root', []);
        this.NodeId = -1;
    }
}

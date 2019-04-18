class Group<T> {
    public key: string;

    public members: T[] = [];

    public constructor(key: string) {
        this.key = key;
    }
}

class Grouper {
    public static groupBy<T>(list: T[], func: (x: T) => string): Group<T>[] {
        const res: Group<T>[] = [];
        let group: Group<T> | undefined;

        list.forEach((o): void => {
            const groupName = func(o);
            if (group === undefined) {
                group = new Group<T>(groupName);
            }
            if (groupName !== group.key) {
                res.push(group);
                group = new Group<T>(groupName);
            }
            group.members.push(o);
        });

        if (group !== undefined) {
            res.push(group);
        }
        return res;
    }
}

export { Group, Grouper };

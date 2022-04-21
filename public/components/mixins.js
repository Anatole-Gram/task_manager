
class TextFormChecker {
    constructor(textToCheck) {
        this.textToCheck = textToCheck;
        this.methods = {
            checkText: (item, val, vm) => {
                val.replace(/\s+/g, "").length >= 9 ? vm.correct[item] = true : vm.correct[item] = false;
                if (vm.correct[item]) {
                    vm.obj[item] = val.replace(/\s{5,}/g, "    ");
                } else vm.obj[item] = val;
            },
            initCorrect: (items, vm) => { items.forEach(item => vm[item] = vm.obj[item]) },
        };
        this.data = () => {
            return {
                arrToCheckText: [...this.textToCheck]
            }
        };
        this.watch = this.initWatch();
        this.computed = this.initComputed();
    };
    initWatch() {
        let arr = [...this.textToCheck];
        return { obj() { this.initCorrect(arr, this) } };
    };
    initComputed() {
        let computed = {};
        this.textToCheck.forEach((el) => {
            let bufer = {
                [el]: {
                    set(newVal) {
                        this.checkText(el, newVal, this);
                    },
                    get() {
                        return this.obj[el];
                    },
                }
            };
            Object.assign(computed, bufer);
        });
        return computed;
    };
};

class TodoFormChecker extends TextFormChecker {
    constructor(textToCheck) {
        super(textToCheck);
    }
    correctInit() {
        super.correctInit();
        this.destination = this.obj.destination;
    };
    initComputed() {
        let computed = super.initComputed();
        let bufer = {
            destination: {
                set(newVal) {
                    newVal ? this.correct.destination = true : this.correct.destination = false;
                    this.obj.destination = newVal;
                },
                get() {
                    return this.obj.destination
                }
            }
        };
        return Object.assign(computed, bufer)
    };

};

export { TodoFormChecker, TextFormChecker };
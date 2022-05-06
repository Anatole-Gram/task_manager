const mapState = Vuex.mapState;
const mapMutations = Vuex.mapMutations;
const imgLoader = {
    data() {
        return {
            pic: {
                width: 0,
                height: 0,
            },
            area: {
                moves: false,
                width: 200,
                height: 200,
                size: 200,
                minWidth: 200,
                minHeight: 200,
                cursorX: 0,
                cursorY: 0,
                pos: {
                    left: 0,
                    top: 0,
                },
            },
            resize: {
                active: false,
                signX: 1,
                signY: 1,
                rectPos: `-${5}px`,
            },
            loader: {
                width: 0,
                height: 0,
            },
            cursorX: 0,
            cursorY: 0,
            compressed: {
                file: "",
                img: "",
            }
        }
    },
    props: ["profileUpd",],
    methods: {
        admit() {
            this.modifiedImg({ dataUrl: this.compressed.img, blob: this.compressed.file })
            this.profileUpd(this.compressed)
            this.editorAva(false)
        },
        compressImg() {
            const canva = document.createElement("canvas");
            canva.width = this.$refs.area.offsetWidth;
            canva.height = this.$refs.area.offsetHeight;
            const context = canva.getContext("2d");
            const pic = document.createElement("img");
            pic.src = this.modified.img;
            const drawOptions = [pic, -this.$refs.area.offsetLeft, -this.$refs.area.offsetTop, this.$refs.img.offsetWidth, this.$refs.img.offsetHeight]
            pic.addEventListener('load', () => {
                context.drawImage(...drawOptions);
                this.compressed.img = canva.toDataURL();
                canva.toBlob((blob) => {
                    blob.originalname = `ava_${this.user.id}.png`;
                    this.compressed.file = blob
                });
            })
        },
        move(e) {
            if (this.area.moves && !this.resize.active) {
                this.defineAreaPos('left', 'top', this.cursorX - this.area.cursorX, this.cursorY - this.area.cursorY);
            };
            if (this.resize.active) {
                this.resize.signX < 0 ? this.area.width += e.movementX : this.area.width -= e.movementX;
                this.resize.signY < 0 ? this.area.height += e.movementY : this.area.height -= e.movementY;
                this.area.size = this.defineAreaSize(Math.max(this.area.width, this.area.height), ...Object.values(this.area.pos))

            }
        },
        defineCursor(e) {
            this.cursorX = e.clientX - this.$refs.loader.offsetLeft;
            this.cursorY = e.clientY - this.$refs.loader.offsetTop;
        },
        dropAnchor(e, el) {
            this.area.cursorX = this.cursorX - this.$refs[el].offsetLeft;
            this.area.cursorY = this.cursorY - this.$refs[el].offsetTop;
            if (e.target.dataset.x) {
                this.resize.active = true;
                let x, y;
                const posX = e.target.dataset.x;
                const posY = e.target.dataset.y;
                switch (true) {
                    case (posX === 'right'): {
                        this.resize.signX = 1;
                        x = this.$refs.loader.offsetWidth - (this.$refs.area.offsetLeft + this.$refs.area.offsetWidth);
                        break;
                    }
                    default: { this.resize.signX = -1; x = this.$refs.area.offsetLeft; }
                }
                switch (true) {
                    case (posY === 'bottom'): {
                        this.resize.signY = 1;
                        y = this.$refs.loader.offsetHeight - (this.$refs.area.offsetTop + this.$refs.area.offsetHeight);
                        break
                    }
                    default: { this.resize.signY = -1; y = this.$refs.area.offsetTop; }
                }
                this.defineAreaPos(posX, posY, x, y,);
            }
        },
        raseAnchor() {
            this.area.width = this.$refs.area.offsetWidth;
            this.area.height = this.$refs.area.offsetHeight;
            this.area.moves = false;
            this.resize.active = false;
            this.compressImg();
        },
        defineImg() {
            this.loader.width = this.$refs.img.width;
            this.loader.height = this.$refs.img.height;
            this.area.maxWidth = Math.min(this.loader.width, this.loader.height);
            this.area.maxHeight = this.area.maxWidth;
        },
        defineAreaPos(posX, posY, x, y) {
            const pos = this.adjustPos(x, y,)
            this.area.pos = {
                [posX]: pos.x + 'px',
                [posY]: pos.y + 'px',
            };
        },
        defineAreaSize(size, posX, posY) {
            let x = parseInt(posX.match(/\d+/));
            let y = parseInt(posY.match(/\d+/));
            switch (true) {
                case ((x + size) > this.$refs.loader.offsetWidth): return this.$refs.loader.offsetWidth - x;
                case ((y + size) > this.$refs.loader.offsetHeight): return this.$refs.loader.offsetHeight - y;
                default: return size
            }
        },
        adjustPos(x, y) {
            let outX = x
            let outY = y
            switch (true) {
                case (outX <= 0): { outX = 0; break; }
                case (this.$refs.loader.offsetWidth <= (outX + this.$refs.area.offsetWidth)): {
                    outX = this.$refs.loader.offsetWidth - this.$refs.area.offsetWidth;
                    break;
                }
            };
            switch (true) {
                case (outY <= 0): { outY = 0; break; }
                case (this.$refs.loader.offsetHeight <= (outY + this.$refs.area.offsetHeight)): {
                    outY = this.$refs.loader.offsetHeight - this.$refs.area.offsetHeight;
                    break;
                }
            };
            return { x: outX, y: outY };
        },
        ...mapMutations('homeModule', [
            'modifiedImg',
            'editorAva',
        ])
    },

    computed: {
        ...mapState([
            'user',
            'svg',
        ]),
        ...mapState('homeModule', [
            'modified',
        ]),
        areaStyle() {
            return {
                width: `${this.area.size}px`,
                height: `${this.area.size}px`,
                maxWidth: `${this.area.maxWidth}px`,
                maxHeight: `${this.area.maxHeight}px`,
                minWidth: `${this.area.minWidth}px`,
                minHeight: `${this.area.minHeight}px`,
                ...this.area.pos,
            }
        },
        loaderStyle() {
            return {
                width: `${this.loader.width}px`,
                height: `${this.loader.height}px`
            }
        }
    },
    mounted() {
        this.raseAnchor();
    },
    template: `
    <div 
        @mouseup="raseAnchor()"
        class="loader-wraper">

        <div ref="loader"
            @mousemove="defineCursor($event), move($event)"
            :style="loaderStyle"
            class="loader">

            <div 
                @mousedown="dropAnchor($event, 'area'), area.moves=true"
                ref="area"
                :style="areaStyle"
                class="loader__img-area">
                <div 
                    @mousedown="dropAnchor($event, 'area')"
                    data-x="right"
                    data-y="bottom"
                    :style="{left:resize.rectPos , top:resize.rectPos}"
                    class="loader__corner">
                    </div>
                <div 
                    @mousedown="dropAnchor($event, 'area')"
                    data-x="left"
                    data-y="bottom"
                    :style="{right:resize.rectPos , top:resize.rectPos}"
                    class="loader__corner">
                    </div>
                <div 
                    @mousedown="dropAnchor($event, 'area')"
                    data-x="right"
                    data-y="top"
                    :style="{left:resize.rectPos , bottom:resize.rectPos}"
                    class="loader__corner">
                    </div>
                <div 
                    @mousedown="dropAnchor($event, 'area')"
                    data-x="left"
                    data-y="top"
                    :style="{right:resize.rectPos , bottom:resize.rectPos}"
                    class="loader__corner">
                    </div>
            </div>
            <img 
                :src="modified.img"
                ref="img"
                @load="defineImg()"
                class="loader__img">
        </div>

            <button 
                @click="admit()"
                :style="{width: loader.width+'px', marginTop: 8+'px'}"
                class="btn loader__btn row row_black">
                    admit
            </button>
            <button 
                @click="editorAva(false)"
                :style="{width: loader.width+'px', marginTop: 8+'px'}"
                class="btn loader__btn row row_black">
                    dismiss
            </button>
    </div>
    `
};
export { imgLoader }


// <div
// @mouseup="raseAnchor()"
// class="loader-wraper">

// <div ref="loader"
// @mousemove="defineCursor($event), move($event)"
// :style="loaderStyle"
// class="loader">

// <div
//     @mousedown="dropAnchor($event, 'area'), area.moves=true"
//     ref="area"
//     :style="areaStyle"
//     class="loader__img-area">
//     <div
//         @mousedown="dropAnchor($event, 'area')"
//         data-x="right"
//         data-y="bottom"
//         :style="{left:resize.rectPos , top:resize.rectPos}"
//         class="loader__corner">
//         </div>
//     <div
//         @mousedown="dropAnchor($event, 'area')"
//         data-x="left"
//         data-y="bottom"
//         :style="{right:resize.rectPos , top:resize.rectPos}"
//         class="loader__corner">
//         </div>
//     <div
//         @mousedown="dropAnchor($event, 'area')"
//         data-x="right"
//         data-y="top"
//         :style="{left:resize.rectPos , bottom:resize.rectPos}"
//         class="loader__corner">
//         </div>
//     <div
//         @mousedown="dropAnchor($event, 'area')"
//         data-x="left"
//         data-y="top"
//         :style="{right:resize.rectPos , bottom:resize.rectPos}"
//         class="loader__corner">
//         </div>
// </div>
// <img
//     :src="modified.img"
//     ref="img"
//     @load="defineImg()"
//     class="loader__img">
// </div>

// <button
//     @click="admit()"
//     :style="{width: loader.width+'px', marginTop: 8+'px'}"
//     class="btn row row--black">
//         admit
// </button>
// <button
//     @click="editorAva(false)"
//     :style="{width: loader.width+'px', marginTop: 8+'px'}"
//     class="btn row row--black">
//         dismiss
// </button>
// </div>
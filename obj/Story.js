'use strict';

export default class Story
{
    constructor(inpEl, txtEl, imgEl)
    {
        this.inputEl        = inpEl;
        this.textEl         = txtEl;
        this.imageEl        = imgEl;
        this.ch             = null;
        this.currentOptions = null;
        const self          = this;

        // Bind events
        this.inputEl.addEventListener('keyup', this.input.bind(self));
    }

    setChapter(ch)
    {
        this.ch = ch;
        this.process(this.ch.intro());
    }

    process(Obj) {
        this.imageEl.src = (Obj.image !== null) ? Obj.image : '';
        this.currentOptions = Obj.options;
        return this.showText(Obj.text);
    }

    showText(text)
    {
        return new Promise((resolve, reject) => {
            const el  = this.textEl;
            let array = text.split('');
            let timer;

            const frameLooper = () =>
            {
                if (array.length > 0) {
                    el.innerHTML += array.shift();
                } else {
                    el.innerHTML += '<br/>';
                    return clearTimeout(timer);
                }
                timer = setTimeout(frameLooper, 20);
            };
            frameLooper.call(this);
        });
    }

    input(e)
    {
        // Enter pressed
        if (e.keyCode === 13) {
            if (this.currentOptions.hasOwnProperty(e.target.value)) {
                this.process(this.currentOptions[e.target.value].call(this.ch));
            } else {
                let output = 'It seems that "' + e.target.value + '" is not a valid option.';
                this.showText(output);
            }
            return e.target.value = '';
        }
    }
}
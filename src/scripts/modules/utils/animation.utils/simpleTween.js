let simpleTween = function({from, to, durationMs, easing}, onUpdate) {
    let val = from;
    let duration = durationMs * 60;
    let frame = 0;

    let loop = function() {
        let easeProgress;

        frame++;

        let progress = frame / duration;
        if (progress > 1) {
            progress = 1;
        }
    
        if (easing) {
            easeProgress = easing(progress);
        } else {
            easeProgress = progress;
        }

        let newVal = from + (to - from) * easeProgress;
        let delta = newVal - val;
        val = newVal;

        onUpdate({
            value: val,
            delta: delta
        });

        if (progress === 1)  {
            return;
        }

        requestAnimFrame(loop);
    }

    loop();
}

export default simpleTween;
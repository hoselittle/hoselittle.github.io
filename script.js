document.addEventListener("DOMContentLoaded", function() {
    /* --- 1. Audio Player --- */
    const playBtn = document.getElementById('play-btn');
    const audio = document.getElementById('bg-music');

    if (playBtn && audio) {
        playBtn.addEventListener('click', () => {
            if (audio.paused) {
                audio.play();
                playBtn.innerText = "⏸️ Pause Music";
            } else {
                audio.pause();
                playBtn.innerText = "🎵 Play Music";
            }
        });
    }

    /* --- 2. Book Logic (Flip Fix Included) --- */
    const papers = document.querySelectorAll('.paper');
    const maxZ = papers.length + 5; 

    papers.forEach((paper, index) => {
        paper.style.zIndex = maxZ - index;
        
        paper.addEventListener('click', () => {
            const isOpening = !paper.classList.contains('flipped');

            if (isOpening) {
                paper.style.zIndex = maxZ + 10; // Bring to top
                paper.classList.add('flipped');
                setTimeout(() => {
                    paper.style.zIndex = index + 1; // Drop to bottom of left stack
                }, 400); 
            } else {
                paper.style.zIndex = maxZ + 10; // Bring to top
                paper.classList.remove('flipped');
                setTimeout(() => {
                    paper.style.zIndex = maxZ - index; // Drop to top of right stack
                }, 400);
            }
        });
    });

    /* --- 3. Close Book Button --- */
    const resetBtn = document.getElementById('reset-btn');
    if(resetBtn) {
        resetBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            papers.forEach((paper, index) => {
                if(paper.classList.contains('flipped')) {
                    paper.style.zIndex = maxZ + 10;
                    paper.classList.remove('flipped');
                    setTimeout(() => {
                        paper.style.zIndex = maxZ - index;
                    }, 400);
                }
            });
        });
    }

    /* --- 4. Envelope Logic (The Fix) --- */
    const envelope = document.getElementById('envelope');
    
    if(envelope) {
        // Force the cursor to be a pointer so you know it's clickable
        envelope.style.cursor = "pointer";
        
        envelope.addEventListener('click', () => {
            console.log("Envelope clicked!"); // This helps debug
            envelope.classList.toggle('open');
        });
    } else {
        console.log("Error: Could not find element with id 'envelope'");
    }
});
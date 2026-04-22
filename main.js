document.addEventListener('DOMContentLoaded', () => {
    const pointsInput = document.getElementById('points-input');
    const addBtn = document.getElementById('add-btn');
    const editModeBtn = document.getElementById('edit-mode-btn');
    const grid = document.getElementById('buttons-grid');
    const totalDisplay = document.getElementById('total-display');
    const lastPressDisplay = document.getElementById('last-press-display');
    const resetBtn = document.getElementById('reset-btn');

    let totalSum = 0;
    let isDeleteMode = false;

    editModeBtn.addEventListener('click', () => {
        isDeleteMode = !isDeleteMode;
        editModeBtn.classList.toggle('active', isDeleteMode);
        grid.classList.toggle('edit-mode', isDeleteMode);
    });

    addBtn.addEventListener('click', () => {
        let val = parseFloat(pointsInput.value);
        if (isNaN(val) || val <= 0) return;

        const formattedVal = val.toFixed(3);
        const btn = document.createElement('div');
        btn.className = 'point-item';
        btn.textContent = parseFloat(formattedVal);

        btn.addEventListener('click', () => {
            if (isDeleteMode) {
                btn.remove();
            } else {
                const points = parseFloat(formattedVal);
                totalSum += points;
                totalDisplay.textContent = totalSum.toFixed(3);
                lastPressDisplay.textContent = `+${points.toFixed(3)}`;
            }
        });

        grid.appendChild(btn);
        pointsInput.value = "";
    });

    resetBtn.addEventListener('click', () => {
        if (confirm("Обнулить все баллы?")) {
            totalSum = 0;
            totalDisplay.textContent = "0.000";
            lastPressDisplay.textContent = "---";
        }
    });
    if ('serviceWorker' in navigator) {
        navigator.serviceWorker.register('sw.js');
    }
});
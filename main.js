document.addEventListener('DOMContentLoaded', () => {
    const pointsInput = document.getElementById('points-input');
    const addBtn = document.getElementById('add-btn');
    const editModeBtn = document.getElementById('edit-mode-btn');
    const grid = document.getElementById('buttons-grid');
    const totalDisplay = document.getElementById('total-display');
    const lastPressDisplay = document.getElementById('last-press-display');
    const resetBtn = document.getElementById('reset-btn');

    // 1. Загружаем данные из памяти при старте
    let totalSum = parseFloat(localStorage.getItem('yarche_totalSum')) || 0;
    let savedButtons = JSON.parse(localStorage.getItem('yarche_buttons')) || [];

    // Отображаем сохраненную сумму
    totalDisplay.textContent = totalSum.toFixed(3);

    // Функция сохранения всего состояния в память
    function saveAll() {
        localStorage.setItem('yarche_totalSum', totalSum);
        const currentButtons = [];
        document.querySelectorAll('.point-item').forEach(btn => {
            currentButtons.push(btn.textContent);
        });
        localStorage.setItem('yarche_buttons', JSON.stringify(currentButtons));
    }

    // Функция создания кнопки (используется и при загрузке, и при добавлении)
    function createButton(val) {
        const btn = document.createElement('div');
        btn.className = 'point-item';
        btn.textContent = val;

        btn.addEventListener('click', () => {
            if (isDeleteMode) {
                btn.remove();
                saveAll(); // Сохраняем список после удаления
            } else {
                const points = parseFloat(val);
                totalSum += points;
                totalDisplay.textContent = totalSum.toFixed(3);
                lastPressDisplay.textContent = `+${points.toFixed(3)}`;
                saveAll(); // Сохраняем новую сумму
            }
        });
        grid.appendChild(btn);
    }

    // 2. Восстанавливаем кнопки из памяти
    savedButtons.forEach(val => createButton(val));

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
        
        createButton(formattedVal);
        saveAll(); // Сохраняем новый список кнопок
        pointsInput.value = "";
    });

    resetBtn.addEventListener('click', () => {
        if (confirm("Обнулить все баллы?")) {
            totalSum = 0;
            totalDisplay.textContent = "0.000";
            lastPressDisplay.textContent = "---";
            saveAll();
        }
    });

    if ('serviceWorker' in navigator) {
        navigator.serviceWorker.register('sw.js');
    }
});
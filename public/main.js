const updateBtn = document.querySelector('#updateBtn');
const achavQuote = {
    name:'אחאב',
    quote:'אל יתהלל חוגר כמפתח',
};

updateBtn.addEventListener('click', () => {
    fetch('/quotes',
            {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(achavQuote)
            }
    );
})

const updateBtn = document.querySelector('#updateBtn');
const achavQuote = {
    name:'אחאב',
    quote:'אל יתהלל חוגר כמפתח',
};

updateBtn.addEventListener('click', async () => {
   let response = await fetch('/quotes',
            {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(achavQuote)
            }
    );

    let responseJson = await response.json();
    console.log('response is ', responseJson);
    /** 
     * בשלב זה אנחנו מתמקדים בלימוד של מונגו
     * ולכן נעזוב את העדכון של הדום.
     * אך בכל מקרה זה משהו שמוכר לכם כבר מהעבר
     * 
     */
})

const deleteBtn = document.querySelector('#deleteBtn');
deleteBtn.addEventListener('click', async () => {
    let response = await fetch('/quotes',
            {
                method: 'DELETE',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ name:'אחאב'})
            }
    );

    let responseJson = await response.json();
    if (responseJson === 'success') {
        document.querySelector('#msg').innerText = 'Deleted successfully';
    } 
    else 
    {
        document.querySelector('#msg').innerText = responseJson;
    }
    
});
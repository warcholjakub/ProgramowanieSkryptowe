function funkcja_zwrotna() {
    let var1 = document.forms['form1'].elements['pole_tekstowe'].value;
    let var2 = document.forms['form1'].elements['pole_liczbowe'].value;
    console.log('%o:%o', var1, typeof (var1));
    console.log('%o:%o', var2, typeof (var2));
}

for (let i = 0; i < 4; i++) {
    val = window.prompt("Podaj dane:");
    console.log('%o:%o', val, typeof (val))
    // 1. 1 : string
    // 2. test : string
    // 3. <empty string> : string
    // 4. null : object
}
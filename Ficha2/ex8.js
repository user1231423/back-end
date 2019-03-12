function desenho(lado) {
    var full = "";
    for (i = 0; i < lado; i++) {
        full += "*";
    }
    console.log(full);
    for (c = 0; c < lado; c++) {
        var mid_empty = "*";
        for (x = 0; x < lado - 2; x++) {
            mid_empty += " ";
            if (x == lado - 3) {
                mid_empty += "*";
            }
        }
        console.log(mid_empty);
    }
    console.log(full);
}
desenho(10);
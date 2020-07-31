export default function mixArrays(ar1, ar2, mix) {
    if (ar1.lenght !== ar2.lenght) {
        console.error('arrays length must be equal');
        return null;
    }

    return ar1.map((el1, i) => {
        let el2 = ar2[i];
        return el1 + (el2 - el1) * mix;
    });
}
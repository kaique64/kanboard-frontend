export function resetForm(object: Object) {
    for (const key in object) {
        object[key] = '';
    }
}
module.exports.groupTypes = ["Verde", "Naranja", "Rojo"]
module.exports.dietTypes = ["Basal", "Diabético", "Sin gluten","Bajo en sal"]
module.exports.genderType = ["Varón", "Mujer"]
module.exports.occupation = ["nurse","physiotherapist","doctor","director","coordinator","psychologist","occupational therapist","social worker","animator"]


module.exports.phoneGenerator = () => {
    let phoneNum ="6"
    for (let i=0; i<11; i++){
        if(i===2 || i===5 || i===8) {
            phoneNum = phoneNum + " "
        }
        else {
            phoneNum = phoneNum + (Math.floor(Math.random() * 10))  
        }
    }
    return phoneNum.toString()
} 


module.exports.randomDate = (start, end) => {
    return new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));
}


module.exports.dniGenerator = () => {
    let dni = ""
    let letter = ""
    let possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    for (let i=0; i<8; i++){
        dni = dni + (Math.floor(Math.random() * 10))  
    }

    letter += possible.charAt(Math.floor(Math.random() * possible.length));
    
    dni = dni + letter
    return dni.toString()
} 

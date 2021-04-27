module.exports.groupTypes = ["Verde", "Naranja", "Rojo"]
module.exports.dietTypes = ["Basal", "Diabético", "Sin gluten","Bajo en sal"]
module.exports.genderType = ["Varón", "Mujer"]
module.exports.occupation = ["nurse","physiotherapist","doctor","director","coordinator","psychologist","occupational therapist","social worker","animator"]

module.exports.elderAvatarMale = [
    "https://res.cloudinary.com/dv7hswrot/image/upload/v1619428231/Vitae/avatares/avataaars_4_dblx23.png",
    "https://res.cloudinary.com/dv7hswrot/image/upload/v1619428102/Vitae/avatares/avataaars_2_hgeou5.png",
    "https://res.cloudinary.com/dv7hswrot/image/upload/v1619428102/Vitae/avatares/avataaars_esku6k.png",
    "https://res.cloudinary.com/dv7hswrot/image/upload/v1619428102/Vitae/avatares/avataaars_3_pkzgkp.png",
    "https://res.cloudinary.com/dv7hswrot/image/upload/v1619545198/Vitae/avatares/avataaars_4_tild4p.png"
]

module.exports.elderAvatarFemale = [
    "https://res.cloudinary.com/dv7hswrot/image/upload/v1619428102/Vitae/avatares/avataaars_1_hg6c0p.png",
    "https://res.cloudinary.com/dv7hswrot/image/upload/v1619544898/Vitae/avatares/avataaars_b1poac.png",
    "https://res.cloudinary.com/dv7hswrot/image/upload/v1619544963/Vitae/avatares/avataaars_1_ede5el.png",
    "https://res.cloudinary.com/dv7hswrot/image/upload/v1619545117/Vitae/avatares/avataaars_2_ay0oy7.png",
    "https://res.cloudinary.com/dv7hswrot/image/upload/v1619545117/Vitae/avatares/avataaars_3_hdoxse.png"

]


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

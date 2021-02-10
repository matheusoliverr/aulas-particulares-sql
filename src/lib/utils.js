module.exports = {
    age: function(timestamp){
        const today = new Date()
        const birth = new Date(timestamp)

        let age = today.getFullYear() - birth.getFullYear()

        let month = today.getMonth() - birth.getMonth()

        let day = today.getDate() - birth.getDate()

        if(month < 0 || (month == 0 && day < 0)){
            age = age-1
        }

        return age
    },
    graduation: function(number){
        if(number == "1"){
            number = "Ensino Médio Completo"
        }
        if(number == "2"){
            number = "Ensino Superior Completo"
        }
        if(number == "3"){
            number = "Mestrado"
        }
        if(number == "4"){
            number = "Doutorado"
        }
        return number
    },
    date: function(timestamp){
    
        const birth = new Date(timestamp)

        let year = birth.getUTCFullYear()

        let month = `0${birth.getUTCMonth() +1}`.slice(-2)

        let day = `0${birth.getUTCDate()}`.slice(-2)

        return {
            day,
            month,
            year,
            iso: `${year}-${month}-${day}`,
            birthDay: `${day} / ${month}`
        }
    },
    grade: function(grade){
        if(grade == "5F"){
            grade = "5° ano do Ensino Fundamental"
        }
        if(grade == "6F"){
            grade = "6° ano do Ensino Fundamental"
        }
        if(grade == "7F"){
            grade = "7° ano do Ensino Fundamental"
        }
        if(grade == "8F"){
            grade = "8° ano do Ensino Fundamental"
        }
        if(grade == "9F"){
            grade = "9° ano do Ensino Fundamental"
        }
        if(grade == "1M"){
            grade = "1° ano do Ensino Médio"
        }
        if(grade == "2M"){
            grade = "2° ano do Ensino Médio"
        }
        if(grade == "3M"){
            grade = "3° ano do Ensino Médio"
        }
        return grade
    },
}
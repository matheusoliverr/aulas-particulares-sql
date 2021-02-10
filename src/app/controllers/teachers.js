const { age, graduation, date } = require('../../lib/utils')
const Teacher = require("../models/Teacher")


module.exports = {
    
    table(req,res){
        let { filter, page, limit } = req.query

        page = page || 1
        limit = limit || 3

        let offset = limit * (page-1)

        let paginate = {
            page,
            limit,
            offset,
        }

        Teacher.paginate(paginate, filter, function(teachers){
            pagination = {
                ...paginate,
                total: Math.ceil(teachers[0].total_teachers / limit)
            }

            return res.render("teach/teachers", {teachers, pagination, filter} )
        })

    },

    create(req,res){
        return res.render("teach/create")
    },

    post(req,res){

        const keys = Object.keys(req.body)
    
        for(key of keys){
            if(req.body[key] == "") return res.send("Todos os dados devem ser preenchidos!")
        }
    
        req.body.birth = Date.parse(req.body.birth)
        req.body.creation_date = Date.now()
        req.body.education_level =  graduation(req.body.education_level),

        Teacher.create(req.body, function(teacher){
            return res.redirect(`/teachers/${teacher.id}`)
        })
    
    },
    
    show(req,res){

        Teacher.find(req.params.id, function(teacher){

            teacher.age = age(teacher.birth),
            teacher.creation_date= Intl.DateTimeFormat("pt-BR").format(teacher.creation_date).split("-")
        
            teacher.creation_date[1] = `0${teacher.creation_date[1]}`.slice(-2),
            teacher.creation_date[2] = `0${teacher.creation_date[2]}`.slice(-2)
        
            return res.render("teach/show", {teacher})
        })

    },
    
    edit(req,res){

        Teacher.find(req.params.id, function(teacher){

            teacher.birth = date(teacher.birth).iso
        
            return res.render("teach/edit", { teacher })
        })

    },
    
    put(req,res){

        const keys = Object.keys(req.body)
    
        for(key of keys){
            if(req.body[key] == "") return res.send("Todos os dados devem ser preenchidos!")
        }

        req.body.birth =  Date.parse(req.body.birth)
        req.body.education_level = graduation(req.body.education_level)

        Teacher.update(req.body, function(){


            return res.redirect(`/teachers/${req.body.id}`)
        })

    },
    
    delete(req,res){
       
        Teacher.delete(req.body.id, function(){
            return res.redirect("/teachers")
        })
            
    },
    
}
 


/*
exports.post = function(req,res){

    const keys = Object.keys(req.body)

    for(key of keys){
        if(req.body[key] == "") return res.send("Todos os dados devem ser preenchidos!")
    }

    req.body.birth = Date.parse(req.body.birth)
    req.body.creation_date = Date.now()

    let teacherId = 1

    const lastTeacher = data.teachers[data.teachers.length - 1]

    if(lastTeacher){
        teacherId = lastTeacher.id + 1
    }

    req.body.id = teacherId

    data.teachers.push(req.body)

    fs.writeFile("data.json", JSON.stringify(data, null, 2), function(err){
        if(err){
            return res.send("error")
        }
        return res.redirect(`/teachers/${req.body.id}`)
    })  
}

exports.show = function(req,res){
    const { id } = req.params

    const foundTeacher = data.teachers.find(function(teacher){
        return id == teacher.id
    })

    if(!foundTeacher) res.send("Teacher not founded!")

    teacher = {
        ...foundTeacher,
        age: age(foundTeacher.birth),
        education_level:  graduation(foundTeacher.education_level),
        acting_area: foundTeacher.acting_area.split(","),
        creation_date: Intl.DateTimeFormat("pt-BR").format(foundTeacher.creation_date).split("-")

    }

    teacher.creation_date[1] = `0${teacher.creation_date[1]}`.slice(-2)
    teacher.creation_date[0] = `0${teacher.creation_date[0]}`.slice(-2)

    return res.render("teach/show", {teacher})
}

exports.edit = function(req,res){
    const { id } = req.params

    const foundTeacher = data.teachers.find(function(teacher){
        return id == teacher.id
    })

    if(!foundTeacher) res.send("Teacher not founded!")

    const teacher = {
        ...foundTeacher,
        birth: date(foundTeacher.birth).iso
    }

    return res.render("teach/edit", { teacher })
}

exports.put = function(req,res){
    const { id } = req.body
    let index = 0

    const foundTeacher = data.teachers.find(function(teacher, foundIndex){
        if(id == teacher.id){
            index = foundIndex
            return true
        }
    })

    if(!foundTeacher) res.send("Teacher not founded!")

    const teacher = {
        ...foundTeacher,
        ...req.body,
        birth: Date.parse(req.body.birth),
        id: Number(req.body.id)
    }

    data.teachers[index]= teacher


    fs.writeFile("data.json", JSON.stringify(data, null, 2), function(err){
        if(err) res.send("Error!")
        return res.redirect(`/teachers/${teacher.id}`)
    }
    )
}

exports.delete = function(req,res){
    const { id } = req.body
    
    const remainingTeachers = data.teachers.filter(function(teacher){
        return teacher.id != id
    })

    data.teachers = remainingTeachers

    fs.writeFile("data.json", JSON.stringify(data, null, 2), function(err){
        if(err) return res.send("Error!")
        
        return res.redirect("/teachers")
    })
}

exports.table = function(req,res){
    let foundTeacher = {}
    let teachers = []
    for(teacher of data.teachers){
        foundTeacher = {
            ...teacher,
            acting_area: teacher.acting_area.split(",")
        }
        teachers.push(foundTeacher)
    }
    
return res.render("teach/teachers", {teachers} )
}
*/
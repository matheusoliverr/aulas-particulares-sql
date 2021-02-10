const { age, graduation, date } = require('../../lib/utils')
const db = require("../../config/db")

module.exports = {
    all(callback){
        db.query(`
            SELECT * FROM students
            ORDER BY name ASC
        `, function(err, results){
            if(err) throw `Database error. ${err}`

            callback(results.rows)
        })
    },

    create(data, callback){
        const query = `
            INSERT INTO students(
                name,
                avatar_url,
                birth,
                email,
                grade,
                study_load,
                teacher_id
            ) VALUES ($1, $2, $3, $4, $5, $6, $7)
            RETURNING id
        `

        const values = [
            data.name,
            data.avatar_url,
            date(data.birth).iso,
            data.email,
            data.grade,
            data.study_load,
            data.teacher
        ]

        db.query(query, values, function(err, results){
            if(err) throw `Database error. ${err}`

            callback(results.rows[0])
        })

    },

    selectTeacher(callback){
        db.query(`
            SELECT teachers.id, teachers.name
            FROM teachers`, function(err,results){
                if(err) throw `Database error. ${err}`

                callback(results.rows)
            })
    },

    find(id, callback){
        db.query(`
            SELECT students.*, teachers.name AS teacher_name
            FROM students
            LEFT JOIN teachers ON (students.teacher_id = teachers.id)
            WHERE students.id = $1 `, [id], function(err, results){
                if(err) throw `Database error. ${err}`
                callback(results.rows[0])
            })
    },

    update(data, callback){
        const query = `
        UPDATE students SET
            name=($1),
            avatar_url=($2),
            birth=($3),
            email=($4),
            grade=($5),
            study_load=($6),
            teacher_id=($7)
        WHERE id = $8
        `

        const values = [
            data.name,
            data.avatar_url,
            date(data.birth).iso,
            data.email,
            data.grade,
            data.study_load,
            data.teacher,
            data.id
        ]

        db.query(query, values, function(err, results){
            if(err) throw `Database error. ${err}`

            callback(results.rows[0])
        })
    },

    delete(id, callback){
        db.query(`
            DELETE FROM students
            WHERE id = $1`, [id], function(err, results){
                if(err) throw `Database error. ${err}`

                callback()
            })


    },
    paginate(paginate, filter, callback){
        const { limit, offset } = paginate

        let queryTotal = `(
            SELECT count(*) FROM students) AS total_students`

        let query = `
            SELECT *, ${queryTotal} 
            FROM students
            `

        if(filter){
            const queryFilter = `
            WHERE students.name ILIKE '%${filter}%'
            OR students.email ILIKE '%${filter}%'`

            queryTotal = `(
                SELECT count(*) FROM students
                ${queryFilter}
                ) AS total_students
                
            `

            query = `
            SELECT *, ${queryTotal} 
            FROM students
            ${queryFilter}
            `
        }

        query = `${query}
        LIMIT $1 OFFSET $2
        `

        db.query(query, [limit, offset], function(err, results){
            if(err) throw `Database error. ${err}`

            callback(results.rows)
        })
    }
}
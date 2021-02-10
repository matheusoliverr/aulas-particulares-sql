const { age, graduation, date } = require('../../lib/utils')
const db = require("../../config/db")

module.exports = {
    all(callback){
        db.query(`
            SELECT * FROM teachers
            ORDER BY name ASC
        `, function(err, results){
            if(err) throw `Database error. ${err}`

            callback(results.rows)
        })
    },

    findBy(filter, callback){
        db.query(`
            SELECT * FROM teachers
            WHERE teachers.name ILIKE '%${filter}%'
            OR teachers.acting_area ILIKE '%${filter}%'
            ORDER BY name ASC
        `, function(err, results){
            if(err) throw `Database error. ${err}`

            callback(results.rows)
        })
    },

    create(data, callback){
        const query = `
            INSERT INTO teachers(
                name,
                avatar_url,
                birth,
                education_level,
                class_type,
                acting_area,
                creation_date
            ) VALUES ($1, $2, $3, $4, $5, $6, $7)
            RETURNING id
        `

        const values = [
            data.name,
            data.avatar_url,
            date(data.birth).iso,
            data.education_level,
            data.class_type,
            data.acting_area,
            date(data.creation_date).iso
        ]

        db.query(query, values, function(err, results){
            if(err) throw `Database error. ${err}`

            callback(results.rows[0])
        })

    },

    find(id, callback){
        db.query(`
            SELECT *
            FROM teachers
            WHERE id = $1 `, [id], function(err, results){
                if(err) throw `Database error. ${err}`

                callback(results.rows[0])
            })
    },

    update(data, callback){
        const query = `
        UPDATE teachers SET
            name=($1),
            avatar_url=($2),
            birth=($3),
            education_level=($4),
            class_type=($5),
            acting_area=($6)
        WHERE id = $7
        `

        const values = [
            data.name,
            data.avatar_url,
            date(data.birth).iso,
            data.education_level,
            data.class_type,
            data.acting_area,
            data.id
        ]

        db.query(query, values, function(err, results){
            if(err) throw `Database error. ${err}`

            callback(results.rows[0])
        })
    },

    delete(id, callback){
        db.query(`
            DELETE FROM teachers
            WHERE id = $1`, [id], function(err, results){
                if(err) throw `Database error. ${err}`

                callback()
            })


    },

    paginate(paginate, filter, callback){
        const { limit, offset } = paginate

        let queryTotal = `(
            SELECT count(*) FROM teachers) AS total_teachers`

        let query = `
            SELECT *, ${queryTotal} 
            FROM teachers
            `

        if(filter){
            const queryFilter = `
            WHERE teachers.name ILIKE '%${filter}%'
            OR teachers.acting_area ILIKE '%${filter}%'`

            queryTotal = `(
                SELECT count(*) FROM teachers 
                ${queryFilter}
                ) AS total_teachers
                
            `

            query = `
            SELECT *, ${queryTotal} 
            FROM teachers
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
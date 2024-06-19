const uuid = require('uuid')
const path = require('path');
const { Profile, UserContact, Review, User } = require('../models/models')
const ApiError = require('../error/ApiError');
const sequelizeObj = require('../db');
const sequelize = require('sequelize');

class ProfileController {

    async update(req, res, next) {
        try {
            const { id: profileId } = req.params;
            let { name, surname, description, city, contacts } = req.body
            const user = req.user

            const dataToUpdate = {
                name,
                surname,
                description,
                city,
                userId: user.id,
            }

            const img = req.files && req.files.img || null
            if (img) {
                const fileName = uuid.v4() + ".jpg"
                img.mv(path.resolve(__dirname, '..', 'static', fileName))
                dataToUpdate["img"] = fileName;
            }

            const updatedRowsCount = await Profile.update(
                dataToUpdate,
                {
                    where: {
                        id: profileId,
                    }
                }
            )

            if (contacts) {
                await UserContact.destroy({ where: { profileId } })

                contacts = JSON.parse(contacts)
                for(let contact of contacts){
                    await UserContact.create({
                        profileId,
                        title: contact.title,
                        description: contact.description,
                    })
                }
            }
            const profile = await ProfileController.getProfile(profileId)
            return res.json(profile)
        } catch (e) {
            next(ApiError.badRequest(e.message))
        }
    }

    async getOne(req, res, next) {
        const { id } = req.params
        const profile = await ProfileController.getProfile(id)

        return res.json(profile)
    }

    static async getProfile(profileId) {
        const profile = await Profile.findOne(
            {
                where: { id: profileId },
                include: [
                    { 
                        model: UserContact,
                        as: 'userContacts' 
                    },
                ]
            },
        )

        const rating = await sequelizeObj.query('SELECT AVG(rating) FROM reviews WHERE "userId" = :userId;',{
            replacements: { userId: profileId },
            plain: true,
            raw: true,
            type: sequelize.QueryTypes.SELECT,
          });

        profile.setDataValue("rating", rating.avg || 0)

        return profile
    }
}

module.exports = new ProfileController()

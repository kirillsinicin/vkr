const uuid = require('uuid')
const path = require('path');
const { Profile, UserContact } = require('../models/models')
const ApiError = require('../error/ApiError');

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
                UserContact.destroy({ where: { profileId } })

                contacts = JSON.parse(contacts)
                contacts.forEach(i =>
                    UserContact.create({
                        profileId,
                        title: i.title,
                        description: i.description,
                    })
                )
                dataToUpdate["contacts"] = contacts;
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
        return await Profile.findOne(
            {
                where: { id: profileId },
                include: [{ model: UserContact, as: 'userContacts' }]
            },
        )
    }
}

module.exports = new ProfileController()

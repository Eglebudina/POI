import { UserSpec, UserCredentialsSpec } from "../models/joi-schemas.js";
import { db } from "../models/db.js";

export const adminController = {
    index: {
        auth: {strategy: "session"},
        handler: async function (request, h) {
            const loggedInUser = request.auth.credentials;
            const users = await db.userStore.getAllUsers();
            const viewData = {
                title: "Admin Dashboard",
                users: users,
                user: loggedInUser
            };
            return h.view("admin-view", viewData);
        },
    },

    userDetails: {
        handler: async function (request, h) {
        const user = await db.userStore.getUserById(request.params.id);
        return h.view("/user");
        },
      },


    deleteUser: {
        handler: async function (request, h) {
            const user = await db.userStore.getUserById(request.params.id);
            await db.userStore.deleteUserById(user._id);
            return h.redirect("/admin");
        },
    },
};

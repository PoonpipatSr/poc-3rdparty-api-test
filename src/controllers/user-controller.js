export const getProfile = (req, res) => {
    res.json({
        message: "Welcome to your profile!",
        user: req.user 
    });
};

export const getAdminDashboard = (req, res) => {
    res.json({
        message: "Welcome to the Secret Admin Dashboard!",
        adminName: req.user.name,
        secretData: "Mai bok rok"
    });
};
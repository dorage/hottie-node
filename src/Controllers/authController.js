import User from '../Models/User';

export const getGoogleCallback = async req => {
    const io = req.app.get('io');
    const {
        user: {
            id: googleId,
            name: { givenName: name }
        }
    } = req;
    try {
        let user = await User.findOne({ name, googleId });
        // 유저 생성 혹은 소켓아이디 변경
        if (user === undefined) {
            user = new User({ name, googleId, socketId });
            user.save();
        }
        // 클라이언트 전달
        io.in(req.session.socketId).emit('google', {
            name: user.name,
            id: user._id
        });
    } catch (e) {
        console.log(e);
        io.in(req.session.socketId).emit('google', { error: e });
    }
};

export const getFacebookCallback = req => {
    const io = req.app.get('io');
    const { givenName, familyName } = req.user.name;
    const user = {
        name: `${givenName} ${familyName}`
    };
    // 유저 생성
    io.in(req.session.socketId).emit('facebook', user);
};

export const getCookieSignIn = async (req, res) => {
    const { socketId } = req.query;
    const { userId } = req.session;

    if (userId) {
        res.send({ name });
    }
    const user = await User.findOne({ socketId }, { name: true });
    req.session.userId = user._id;
    req.session.userName = user.name;
    res.send(user);
};

export const getCookieSignOut = (req, res) => {
    delete req.session.userId;
    delete req.session.userName;
};

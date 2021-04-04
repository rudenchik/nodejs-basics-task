const database = {
    getUser: (id, callback) => {
        const users = [{
            id: 1,
            name: 'Robert',
        }, {
            id: 2,
            name: 'John'
        }];

        const user = users.find((user) => user.id === id);
        if (!user) {
            callback(`User with id=${id} not found`);
        } else {
            callback(null, user);
        }
    },
    getUsersBook: (userId, callback) => {
        const usersBooks = {
            1: [],
            2: [1, 2],
        };

        const userBook = usersBooks[userId];
        if (!userBook) {
            callback(`Set of books related to userId=${userId} not found`);
        } else {
            callback(null, userBook);
        }
    },
    buyBook: (id, callback) => {
        const books = [{
            id: 1,
            name: 'Art of war'
        }, {
            id: 2,
            name: 'Hunger games'
        }, {
            id: 3,
            name: '1984'
        }];

        const book = books.find((book) => book.id === id);
        if (!book) {
            callback(`Book with id=${id} not found`);
        } else {
            callback(null, true);
        }
    },
};

const util = require('util');
const getUserPromisified = util.promisify(database.getUser);
const getUsersBookPromisified = util.promisify(database.getUsersBook);
const buyBookPromisified = util.promisify(database.buyBook);

const buyBookForUser = async (bookId, userId) => {
    try {
        await getUserPromisified(userId);
        const userBooks = await getUsersBookPromisified(userId);
        if (userBooks.includes(bookId)) {
            return `User already has book with id=${bookId}`;                                                                                                                                                                                                           
        } else {
            await buyBookPromisified(bookId);
            return "Success"
        }
    } catch (err) {
        return err;
    }
}

(async () => {
    console.log(await buyBookForUser(1, 1));
    console.log(await buyBookForUser(1, 2));
    console.log(await buyBookForUser(3, 2));
    console.log(await buyBookForUser(5, 2));
    console.log(await buyBookForUser(1, 3));
})();
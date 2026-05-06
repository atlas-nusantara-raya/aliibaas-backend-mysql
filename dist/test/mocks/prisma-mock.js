"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createPrismaMock = void 0;
const createPrismaMock = () => {
    const mock = {
        user: {
            findUnique: jest.fn(),
            create: jest.fn(),
        },
        mtRole: {
            findUnique: jest.fn(),
            create: jest.fn(),
        },
        userAddress: {
            findMany: jest.fn(),
            findUnique: jest.fn(),
            create: jest.fn(),
            update: jest.fn(),
            updateMany: jest.fn(),
            count: jest.fn(),
        },
        product: {
            findMany: jest.fn(),
            findUnique: jest.fn(),
            create: jest.fn(),
            update: jest.fn(),
            delete: jest.fn(),
        },
        productVariant: {
            findUnique: jest.fn(),
            update: jest.fn(),
            deleteMany: jest.fn(),
        },
        wishlist: {
            findUnique: jest.fn(),
            findMany: jest.fn(),
            create: jest.fn(),
            delete: jest.fn(),
        },
        cart: {
            findFirst: jest.fn(),
            create: jest.fn(),
            findUnique: jest.fn(),
        },
        cartItem: {
            findFirst: jest.fn(),
            create: jest.fn(),
            update: jest.fn(),
            deleteMany: jest.fn(),
        },
        order: {
            create: jest.fn(),
            findUnique: jest.fn(),
            findMany: jest.fn(),
            update: jest.fn(),
        },
        shipment: {
            create: jest.fn(),
            update: jest.fn(),
        },
        payment: {
            create: jest.fn(),
            findUnique: jest.fn(),
            update: jest.fn(),
        },
        mtStatus: {
            findFirst: jest.fn(),
        },
    };
    mock.$transaction = jest.fn((callback) => callback(mock));
    return mock;
};
exports.createPrismaMock = createPrismaMock;
//# sourceMappingURL=prisma-mock.js.map
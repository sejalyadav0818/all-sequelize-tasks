module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn('Users', 'id', {

        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      
    });
    // await queryInterface.sequelize.query('ALTER TABLE "Users" ADD COLUMN "id";');
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn('Users', 'id');
  }
};
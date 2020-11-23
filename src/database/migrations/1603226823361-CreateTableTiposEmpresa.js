const { Table } = require('typeorm');

class CreateTableTiposEmpresa1603226823361 {

  async up(queryRunner) {
    await queryRunner.createTable(
      new Table({
        name: 'tiposEmpresa',
        columns: [
          {
            name: 'id',
            type: 'smallint',
            isPrimary: true,
            isUnique: true
          },
          {
            name: 'nome',
            type: 'varchar',
            length: "40",
            isUnique: true,
            isNullable: false,
          }
        ]
      })
    );

    await queryRunner.manager.createQueryBuilder().insert()
      .into('tiposEmpresa')
      .values([
        { id: 1, nome: 'Consultoria de Fundos de Investimentos' },
        { id: 2, nome: 'Órgão Público Parceiro' }
      ])
      .execute();
  }

  async down(queryRunner) {
    await queryRunner.dropTable('tiposEmpresa');
  }
}

module.exports = CreateTableTiposEmpresa1603226823361;
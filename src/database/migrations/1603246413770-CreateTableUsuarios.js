const { MigrationInterface, QueryRunner, Table, TableForeignKey } = require('typeorm');

class CreateTableUsuarios1603246413770{
  
  async up(queryRunner){
    await queryRunner.createTable(
      new Table({
        name: 'usuarios',
        columns: [
          {
            name: 'id',
            type: 'uuid',
            isPrimary: true,
            generationStrategy: 'uuid',
            default: 'uuid_generate_v4()'
          }, {
            name: 'empresa_id',
            type: 'uuid',
            isNullable: false
          }, {
            name: 'nome',
            type: 'varchar',
            length: '60',
            isNullable: false
          }, {
            name: 'conta',
            type: 'varchar',
            length: '20',
            isUnique: true,
            isNullable: false
          }, {
            name: 'senha',
            type: 'varchar',
            length: '80',
            isNullable: false,
          }, {
            name: 'alterar_senha',
            type: 'boolean',
            default: true,
          }, {
            name: 'email',
            type: 'varchar',
            length: '60',
            isUnique: true,
            isNullable: true,
          }, {
            name: 'create_at',
            type: 'timestamp',
            default: 'now()',
            isNullable: false
          }, {
            name: 'update_at',
            type: 'timestamp',
            default: 'now()',
            isNullable: false
          }
        ]
      })
    );

    await queryRunner.createForeignKey('usuarios', new TableForeignKey({
      name: 'FK_Usuarios_Empresa',
      columnNames: ['empresa_id'],
      referencedColumnNames: ['id'],
      referencedTableName: 'empresas',
      onUpdate: 'CASCADE',
      onDelete: 'RESTRICT'
    }));
  }

  async down(queryRunner){
    await queryRunner.dropTable('usuarios');
  }
}

module.exports = CreateTableUsuarios1603246413770;

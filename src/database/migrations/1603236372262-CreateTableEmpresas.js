const { Table, TableForeignKey } = require('typeorm');

class CreateTableEmpresas1603236372262{

  async up(queryRunner){
    // this ensure we can use default: `uuid_generate_v4()`
    await queryRunner.query(`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`);
    
    await queryRunner.createTable(
      new Table({
        name: 'empresas',
        columns: [
          {
            name: 'id',
            type: 'uuid',
            isPrimary: true,
            generationStrategy: 'uuid',
            default: 'uuid_generate_v4()'
          }, {
            name: 'tipo_empresa_id',
            type: 'smallint',
            isNullable: false
          }, {
            name: 'cnpj',
            type: 'char',
            length: '14',
            isUnique: true,
            isNullable: false
          }, {
            name: 'nome',
            type: 'varchar',
            length: '80',
            isNullable: false
          }, {
            name: 'razao_social',
            type: 'varchar',
            length: '80',
            isNullable: false
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

    await queryRunner.createForeignKey('empresas', new TableForeignKey({
      name: 'FK_Empresas_TipoEmpresa',
      columnNames: ['tipo_empresa_id'],
      referencedColumnNames: ['id'],
      referencedTableName: 'tiposEmpresa',
      onUpdate: 'CASCADE',
      onDelete: 'RESTRICT'
    }));

    await queryRunner.manager.createQueryBuilder().insert()
      .into('empresas',
        [
          'tipo_empresa_id',
          'cnpj',
          'nome',
          'razao_social'
        ]
      )
      .values([
        {
          tipo_empresa_id: 1,
          cnpj: '20786252000103',
          nome: 'Central Master',
          razao_social: 'Central Master Serviços Financeiros Ltda.'
        }, {
          tipo_empresa_id: 2,
          cnpj: '46482857000196',
          nome: 'Município de Ubatuba',
          razao_social: 'Prefeitura Municipal de Ubatuba'
        },
        
      ])
      .execute();
  }

  async down(queryRunner){
    await queryRunner.dropTable('empresas');
  }
}

module.exports = CreateTableEmpresas1603236372262;
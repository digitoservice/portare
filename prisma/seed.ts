import { db } from '@/lib/db'

async function main() {
  // await updatePermissions()
  // await db.$transaction([
  //   db.user.create({
  //     data: {
  //       username: 'nicolasbaldoino', // password: nico205@
  //       externalUserId: 'user_2bHmtB9K8lWIhDEJCiaYSNaTQu2',
  //       groups: { connect: { name: GROUP_ROOT } },
  //     },
  //   }),
  //   db.unit.create({
  //     data: {
  //       company: {
  //         connectOrCreate: {
  //           where: { document: '86447224000161' },
  //           create: {
  //             name: 'COMIX TRANSPORTES LTDA',
  //             tradeName: 'COMIX SANTA CATARINA',
  //             document: '86447224000161',
  //             address: {
  //               create: {
  //                 zipCode: '88745-000',
  //                 city: 'CAPIVARI DE BAIXO',
  //                 state: 'SANTA CATARINA',
  //                 locale: 'RODOVIA BR 101, S/N KM 326,5 VILA FLOR',
  //               },
  //             },
  //           },
  //         },
  //       },
  //     },
  //   }),
  //   db.unit.create({
  //     data: {
  //       company: {
  //         connectOrCreate: {
  //           where: { document: '86447224002296' },
  //           create: {
  //             name: 'COMIX TRANSPORTES LTDA',
  //             tradeName: 'COMIX PARANÁ',
  //             document: '86447224002296',
  //             address: {
  //               create: {
  //                 zipCode: '81280-140',
  //                 city: 'CURITIBA',
  //                 state: 'PARANÁ',
  //                 locale:
  //                   'AVENIDA JUSCELINO KUBITSCHEK DE OLIVEIRA, 1975 CIDADE INDUSTRIAL',
  //               },
  //             },
  //           },
  //         },
  //       },
  //     },
  //   }),
  //   db.client.create({
  //     data: {
  //       company: {
  //         connectOrCreate: {
  //           where: { document: '93953779000140' },
  //           create: {
  //             name: 'VOX CIMENTOS LTDA',
  //             tradeName: 'VOX CIMENTOS',
  //             document: '93953779000140',
  //             address: {
  //               create: {
  //                 zipCode: '84030-900',
  //                 city: 'PONTA GROSSA',
  //                 state: 'PARANÁ',
  //                 locale: 'AVENIDA GENERAL CARLOS CAVALCANTI, 5000 UVARANAS',
  //               },
  //             },
  //           },
  //         },
  //       },
  //     },
  //   }),
  //   db.client.create({
  //     data: {
  //       company: {
  //         connectOrCreate: {
  //           where: { document: '82158361000125' },
  //           create: {
  //             name: 'NORTE INDUSTRIA E COMERCIO LTDA',
  //             tradeName: 'NORTE INDUSTRIA',
  //             document: '82158361000125',
  //             address: {
  //               create: {
  //                 zipCode: '84010-000',
  //                 city: 'PONTA GROSSA',
  //                 state: 'PARANÁ',
  //                 locale: 'AVENIDA LUIZ XAVIER, 68 CENTRO',
  //               },
  //             },
  //           },
  //         },
  //       },
  //     },
  //   }),
  //   db.driver.create({
  //     data: {
  //       person: {
  //         create: {
  //           name: 'BRUNO HENRIQUE DE OLIVEIRA',
  //           nickname: 'OLIVEIRA',
  //           document: '10640254047',
  //           phoneNumber: '48985456478',
  //           unit: { connect: { companyId: 1 } },
  //         },
  //       },
  //       cnh: '70315808200',
  //     },
  //   }),
  //   db.truck.create({
  //     data: {
  //       vehicle: {
  //         create: {
  //           licensePlate: 'HJK-8901',
  //           brand: {
  //             create: {
  //               name: 'VOLVO',
  //             },
  //           },
  //           model: 'FH-16',
  //           year: '2022',
  //           renavam: '63482170849',
  //           unit: { connect: { companyId: 1 } },
  //         },
  //       },
  //       compressor: true,
  //     },
  //   }),
  //   db.semiTrailer.create({
  //     data: {
  //       cargos: { create: { name: 'CIMENTO' } },
  //       type: { create: { name: 'SILO' } },
  //       configuration: { create: { name: 'LS', numberOfTrailers: 1 } },
  //       trailers: {
  //         create: {
  //           vehicle: {
  //             create: {
  //               licensePlate: 'OPQ-5678',
  //               brand: {
  //                 create: {
  //                   name: 'RANDON',
  //                 },
  //               },
  //               year: '2022',
  //               renavam: '63103003248',
  //               axle: 4,
  //               unit: { connect: { companyId: 1 } },
  //             },
  //           },
  //           fleetNumber: '4002',
  //         },
  //       },
  //     },
  //   }),
  // ])
}

main()
  .then(async () => {
    await db.$disconnect()
  })
  .catch(async (error) => {
    console.error(error)
    await db.$disconnect()
    process.exit(1)
  })

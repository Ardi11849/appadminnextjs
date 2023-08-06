import { format } from 'date-fns';
const tanggal = new Date('06-08-2023 17:31:33');

const Api = [
    {
      id: 1,
      username: 'ArdiSuryana',
      perusahaan: 'Starlight',
      alamatperusahaan: 'Jl. Terusan Merdeka Gedung Jaya',
      active: 1,
      createdAt: format(tanggal, 'dd-MMM-yyyy H:I:s')
    },
    {
      id: 2,
      username: 'Test',
      perusahaan: 'Pt. Meta',
      alamatperusahaan: 'Jl. Terusan Gatot Subroto Gedung Punya Mark',
      active: 1,
      createdAt: format(tanggal, 'dd-MMM-yyyy H:I:s')
    },
    {
      id: 3,
      username: 'ArdiSuryana',
      perusahaan: 'Pt. Optimus',
      alamatperusahaan: 'Jl. Panjang Gatot Subroto Gedung Optomus Prime',
      active: 0,
      createdAt: format(tanggal, 'dd-MMM-yyyy H:I:s')
    }
  ];
  
  export default Api;
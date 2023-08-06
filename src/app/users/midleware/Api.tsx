import { format } from 'date-fns';
const tanggal = new Date();

const Api = [
    {
      id: 1,
      username: 'ArdiSuryana',
      perusahaan: 'Starlight',
      alamat_perusahaan: 'Jl. Terusan Merdeka Gedung Jaya',
      active: 1,
      createdAt: format(tanggal, 'dd-MMM-yyyy H:I:s')
    },
    {
      id: 2,
      username: 'Test',
      perusahaan: 'Pt. Meta',
      alamat_perusahaan: 'Jl. Terusan Gatot Subroto Gedung Punya Mark',
      active: 1,
      createdAt: format(tanggal, 'dd-MMM-yyyy H:I:s')
    },
    {
      id: 3,
      username: 'ArdiSuryana',
      perusahaan: 'Pt. Optimus',
      alamat_perusahaan: 'Jl. Panjang Gatot Subroto Gedung Optomus Prime',
      active: 0,
      createdAt: format(tanggal, 'dd-MMM-yyyy H:I:s')
    }
  ];
  
  export default Api;
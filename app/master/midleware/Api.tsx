import { apis } from "../../../global/apis"
  
export const getJenisPerusahaan = async () => {
  const data = {
    method: 'get',
    url: '/jenis-perusahaan/results',
    data: {
      page: 0,
      perpage: 0
    }
  }
  const result = await apis(data)
  return result;
}
  
export const getKategoriPekerjaan = async () => {
  const data = {
    method: 'get',
    url: '/kategori-pekerjaan/results',
    data: {
      page: 0,
      perpage: 0
    }
  }
  const result = await apis(data)
  return result;
}
  
export const getKeahlian = async () => {
  const data = {
    method: 'get',
    url: '/keahlian/results',
    data: {
      page: 0,
      perpage: 0
    }
  }
  const result = await apis(data)
  return result;
}
  
export const getLevelPekerjaan = async () => {
  const data = {
    method: 'get',
    url: '/level-pekerjaan/results',
    data: {
      page: 0,
      perpage: 0
    }
  }
  const result = await apis(data)
  return result;
}
  
export const getPendidikan = async () => {
  const data = {
    method: 'get',
    url: '/pendidikan/results',
    data: {
      page: 0,
      perpage: 0
    }
  }
  const result = await apis(data)
  return result;
}
  
export const getTahunPengalaman = async () => {
  const data = {
    method: 'get',
    url: '/tahun-pengalaman/results',
    data: {
      page: 0,
      perpage: 0
    }
  }
  const result = await apis(data)
  return result;
}
  
export const getTipePekerjaan = async () => {
  const data = {
    method: 'get',
    url: '/tipe-pekerjaan/results',
    data: {
      page: 0,
      perpage: 0
    }
  }
  const result = await apis(data)
  return result;
}
  
export const getWilayahNegara = async () => {
  const data = {
    method: 'get',
    url: '/wilayah/negara/results',
    data: {
      page: 0,
      perpage: 0
    }
  }
  const result = await apis(data)
  return result;
}
  
export const getWilayahProvinsi = async () => {
  const data = {
    method: 'get',
    url: '/wilayah/provinsi/results',
    data: {
      page: 0,
      perpage: 0
    }
  }
  const result = await apis(data)
  return result;
}
  
export const getWilayahKabupaten = async () => {
  const data = {
    method: 'get',
    url: '/wilayah/kabupaten/results',
    data: {
      page: 0,
      perpage: 0
    }
  }
  const result = await apis(data)
  return result;
}
  
export const getWilayahKecamatan = async (page: number, perPage: number) => {
  const data = {
    method: 'get',
    url: '/wilayah/kecamatan/results',
    data: {
      page: page,
      perpage: perPage
    }
  }
  const result = await apis(data)
  return result;
}
  
export const getWilayahKelurahan = async (page: number, perPage: number, search: string) => {
  const data = {
    method: 'get',
    url: '/wilayah/kelurahan/results',
    data: {
      page: page,
      perpage: perPage,
      name: search,
    }
  }
  const result = await apis(data)
  return result;
}
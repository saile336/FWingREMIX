import { defineStore } from 'pinia'

export const currentOrg = defineStore('orgs', () => {
  const orgs = [
    {
      name: "TLK",
      kideUrl: "https://api.kide.app/api/companies/8216a1bc-760d-407b-9c77-5e26a041a25c"
    },
    {
      name: "HanSe SF",
      kideUrl: "https://api.kide.app/api/companies/90d58532-87be-4a30-b4e3-6053db20caa5"
    },
    {
      name: "Commedia rf",
      kideUrl: "https://api.kide.app/api/companies/b7b04c01-6c49-4c74-81da-9f4147aca6db"
    },
    {
      name: "Kult rf",
      kideUrl: "https://api.kide.app/api/companies/d12f83ed-8efa-40d9-8288-e62f1ac8fc43"
    }
  ]

  let currentIndex = 0

  function goToIndex(n) {
    currentIndex = n
  }

  return { orgs, currentIndex, goToIndex }
})

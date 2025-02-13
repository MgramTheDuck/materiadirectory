---
# https://vitepress.dev/reference/default-theme-home-page
layout: home
title: Home

hero:
  name: "Materia Directory"
  tagline: Materia Directory is a hub of communities and resources focussed on the Materia Datacenter and other useful FF14 resources.
  image:
    src: /images/materia-logo-large.webp
    alt: VitePress
---

# Resources <Badge type="warning" text="Beta" />

---

<SitesList/>

# Community Channels <Badge type="warning" text="Beta" />

---

<TwitchList/>


<script setup>
import { VPTeamPage, VPTeamPageTitle, VPTeamMembers } from 'vitepress/theme'

const members = [
    {
        avatar: 'https://cdn.discordapp.com/avatars/336809049985122306/bfd492b9ef84c5925c5e015c955da896?size=256',
        name: 'Ori Na',
        title: 'Creator',
        desc: "@ori9607"
    },
    {
        avatar: 'https://cdn.discordapp.com/avatars/327029966858485772/270d40f773fef3c3b2f69942412bdb60?size=256',
        name: 'Mango',
        title: 'Creator',
        desc: "@mango_vi"
    },
    {
        avatar: 'https://cdn.discordapp.com/avatars/211624816619290624/57e2b10fdc8c5b525ba3bbefef027696?size=256',
        name: 'Em Gram',
        title: 'Web Developer',
        desc: "@mgram"
    },

]
</script>

<VPTeamPage>
  <VPTeamPageTitle>
    <template #title>
      Key Contributors
    </template>
    <template #lead>
      Materia Directory is a team project by a collection of dedicated members of the Materia Community. 
    </template>
  </VPTeamPageTitle>
  <VPTeamMembers
    :members="members"
  />
</VPTeamPage>
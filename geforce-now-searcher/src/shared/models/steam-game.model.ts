export interface ISteamGame extends ISteamGameMinimal {
  name: string;
  img_icon_url: string;
  img_logo_url: string;
  has_community_visible_status: boolean;
}

export interface ISteamGameMinimal {
  appid: number;
  playtime_forever: number;
  playtime_linux_forever: number;
  playtime_mac_forever: number;
  playtime_windows_forever: number;
}
export interface MountResponse {
  id: number;
  name: string;
}

export interface MountListResponse {
  mounts: Array<MountResponse>;
}

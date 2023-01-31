import { Image, IImageProps } from "native-base";

type UserPhotoProps = {
  size: number;
} & IImageProps;

export const UserPhoto = ({ size, ...props }: UserPhotoProps) => (
  <Image
    w={size}
    h={size}
    rounded="full"
    borderWidth={2}
    borderColor="gray.400"
    {...props}
  />
);

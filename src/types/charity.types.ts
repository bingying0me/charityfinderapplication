export type CharityType = {
  ein: string;
  name: string;
  tags: string[];
  logoUrl: string;
  location: string;
};

export type CharityListProps = {
  posts: CharityType[];
}

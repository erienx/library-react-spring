
import ProfileIcon from "../assets/profile-icon.svg?react";
import BookIcon from "../assets/form/book.svg?react";
import NumberIcon from "../assets/form/numbers.svg?react";
import AuthorIcon from "../assets/form/author.svg?react";
import CalendarIcon from "../assets/form/calendar.svg?react";
import PublisherIcon from "../assets/form/publisher.svg?react";
import CategoryIcon from "../assets/form/category.svg?react";
import CopyIcon from "../assets/form/copy.svg?react";
import ImageIcon from "../assets/form/image.svg?react";
import EmailIcon from "../assets/email-icon.svg?react"
import PasswordIcon from "../assets/password-icon.svg?react"

export const iconMap: Record<string, React.FC<any>> = {
  book: BookIcon,
  calendar: CalendarIcon,
  image: ImageIcon,
  author: AuthorIcon,
  copy: CopyIcon,
  category: CategoryIcon,
  publisher: PublisherIcon,
  number: NumberIcon,
  profile: ProfileIcon,
  email: EmailIcon,
  password: PasswordIcon,
};
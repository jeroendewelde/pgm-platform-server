import { CreatePersonInformationInput } from "./create-person-information.input";
import { InputType, Field, Int, PartialType } from "@nestjs/graphql";
import { IsNotEmpty, IsString } from "class-validator";
import { CreateSocialMediaInput } from "src/social-medias/dto/create-social-media.input";
import { CreateFieldExperienceInput } from "src/field-experiences/dto/create-field-experience.input";
import { UpdateSocialMediaInput } from "src/social-medias/dto/update-social-media.input";

@InputType()
// export class UpdatePersonInformationInput extends PartialType(
//   CreatePersonInformationInput
// ) {
export class UpdatePersonInformationInput {
  @IsNotEmpty()
  @IsString()
  @Field(() => String, {
    description: "The quote for this person",
    nullable: true,
  })
  quote?: string;

  @IsNotEmpty()
  @IsString()
  @Field(() => String, {
    description: "The bio for this person",
    nullable: true,
  })
  bio?: string;

  @Field({ description: "Date of birth for this person", nullable: true })
  dob?: string;

  @Field((type) => Int, { nullable: true })
  personId?: number;

  @Field((type) => [UpdateSocialMediaInput], {
    nullable: true,
    description: "List of social media for this person",
  })
  socialMedias?: UpdateSocialMediaInput[];

  @Field((type) => [CreateFieldExperienceInput], {
    nullable: true,
    description: "List of field experiences for this person",
  })
  fieldExperiences?: CreateFieldExperienceInput[];
}

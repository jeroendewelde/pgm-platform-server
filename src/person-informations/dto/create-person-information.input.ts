import { InputType, Int, Field } from "@nestjs/graphql";
import { IsNotEmpty, IsString } from "class-validator";
import { CreateFieldExperienceInput } from "src/field-experiences/dto/create-field-experience.input";
import { CreateSocialMediaInput } from "src/social-medias/dto/create-social-media.input";

@InputType()
export class CreatePersonInformationInput {
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

  @Field((type) => [CreateSocialMediaInput], {
    nullable: true,
    description: "List of social media for this person",
  })
  socialMedias?: CreateSocialMediaInput[];

  @Field((type) => [CreateFieldExperienceInput], {
    nullable: true,
    description: "List of field experiences for this person",
  })
  fieldExperiences?: CreateFieldExperienceInput[];
}

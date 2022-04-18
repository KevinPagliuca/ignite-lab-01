import { Injectable } from '@nestjs/common';
import { PrismaService } from '../database/prisma/prisma.service';

import slugify from 'slugify';

interface CreateCourseParams {
  slug?: string;
  title: string;
}

const regexToSlug = /[*+~.()'"!:@]/g;

@Injectable()
export class CoursesService {
  constructor(private prisma: PrismaService) {}

  async listAllCourses() {
    return await this.prisma.course.findMany();
  }

  async getCourseById(id: string) {
    return await this.prisma.course.findUnique({
      where: { id },
    });
  }

  async getCourseBySlug(slug: string) {
    return await this.prisma.course.findUnique({
      where: { slug },
    });
  }

  async createCourse({
    title,
    slug = slugify(title, {
      lower: true,
      remove: regexToSlug,
    }),
  }: CreateCourseParams) {
    const courseAlreadyExists = await this.prisma.course.findUnique({
      where: { slug },
    });

    if (courseAlreadyExists) {
      throw new Error(`Course already exists`);
    }

    return await this.prisma.course.create({
      data: {
        title,
        slug,
      },
    });
  }
}

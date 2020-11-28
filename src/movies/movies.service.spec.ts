import { Test, TestingModule } from '@nestjs/testing';
import { MoviesService } from './movies.service';
import { NotFoundException } from '@nestjs/common';

describe('MoviesService', () => {
  let service: MoviesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [MoviesService],
    }).compile();

    service = module.get<MoviesService>(MoviesService);

    service.create({
      title: 'Test Movie',
      genres: ['Test'],
      year: 2000,
    });
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('getAll', () => {
    it('should return an array', () => {
      const result = service.getAll();
      expect(result).toBeInstanceOf(Array);
    });
  });

  describe('getOne', () => {
    it('should return a moive', () => {
      const movie = service.getOne(1);
      expect(movie).toBeDefined();
    });

    it('should throw 404 error', () => {
      try {
        service.getOne(9999);
      } catch (e) {
        expect(e).toBeInstanceOf(NotFoundException);
      }
    });
  });

  describe('deleteOne', () => {
    it('should delete a movie', () => {
      const beforeDeleteMovie = service.getAll().length;

      const deletedResult = service.deleteOne(1);

      const afterDeleteMovie = service.getAll().length;

      expect(afterDeleteMovie).toBeLessThan(beforeDeleteMovie);
    });

    it('should return a 404', () => {
      try {
        service.deleteOne(999);
      } catch (e) {
        expect(e).toBeInstanceOf(NotFoundException);
      }
    });
  });

  describe('createMovie', () => {
    it('create a moive', () => {
      const beforeCreateMovie = service.getAll().length;

      service.create({
        title: 'Test Movie',
        genres: ['test'],
        year: 2000,
      });

      const afterCreateMovie = service.getAll().length;

      expect(afterCreateMovie).toBeGreaterThan(beforeCreateMovie);
    });
  });

  describe('updateMovie', () => {
    it('updates a movie', () => {
      service.update(1, {
        year: 2020,
      });

      const updatedMovie = service.getOne(1);
      expect(updatedMovie.year).toEqual(2020);
    });

    it('should throw a NotFoundException', () => {
      try {
        service.update(999, {});
      } catch (e) {
        expect(e).toBeInstanceOf(NotFoundException);
      }
    });
  });
});

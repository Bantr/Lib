import { Entity, PrimaryGeneratedColumn, Column, OneToMany, ManyToMany, JoinTable, BaseEntity, Unique, CreateDateColumn } from 'typeorm';
import { Ban } from './ban.entity';
import { User } from './user.entity';
import { Match } from './match.entity';

/**
 * Database record
 */
@Entity()
@Unique(['steamId'])
export class TrackedAccount extends BaseEntity {
    /**
     * Primary key
     */
    @PrimaryGeneratedColumn()
    id: number;

    @CreateDateColumn()
    createdAt: Date;

    /**
     * Steam identifier
     */
    @Column()
    steamId: string;

    /**
     * When did we last check if this user has bans registered on external services
     */
    @Column({
        default: new Date(0),
    })
    lastCheckedAt: Date;

    @Column({ nullable: true })
    steamUsername: string;

    @Column({ nullable: true })
    steamAvatar: string;

    @Column({ nullable: true })
    steamProfile: string;

    /**
     * Bans detected for this user
     */
    @OneToMany(() => Ban, ban => ban.trackedAccount)
    bans: Ban[];

    /**
     * Matches this account played in
     */
    @ManyToMany(() => Match, match => match.players)
    matches: Match[];
    /**
     * Which users track this account
     */
    @ManyToMany(() => User, user => user.tracks, { eager: true })
    @JoinTable()
    trackedBy: User[];

    @ManyToMany(() => User, user => user.follows)
    @JoinTable()
    followedBy: User[];
}

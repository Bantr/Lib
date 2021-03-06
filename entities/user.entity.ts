import { BaseEntity, Column, Entity, JoinColumn, ManyToMany, OneToMany, OneToOne, PrimaryGeneratedColumn } from 'typeorm';

import { CustomTheme } from './customTheme.entity';
import { Match } from './match.entity';
import { Notification } from './notification.entity';
import { Player } from './player.entity';
import { UserSettings } from './user-settings.entity';

/**
 * Database entity
 */
@Entity()
export class User extends BaseEntity {
  /**
   * Primary key
   */
  @PrimaryGeneratedColumn()
  id: number;

  /**
   * Username
   */
  @Column()
  username: string;

  /**
   * Steam identifier
   */
  @Column("text", { unique: true })
  steamId: string;

  /**
   * Discord identifier
   */
  @Column("text", { nullable: true })
  discordId: string;

  /**
   * Faceit identifier
   */
  @Column("text", { nullable: true })
  faceitId: string;

  /**
   * Username on Faceit
   */
  @Column("text", { nullable: true })
  faceitName: string;

  @Column("text", { default: "user" })
  role: string;

  @Column({
    type: "timestamp with time zone",
    default: () => "CURRENT_TIMESTAMP"
  })
  lastActive: Date;

  /**
   * When did we last check if this user has new matches on Faceit
   */
  @Column({
    default: new Date(0)
  })
  lastCheckedAtFaceit: Date;

  /**
   * When did we last check if this user has new matches on Steam
   */
  @Column({
    default: new Date(0)
  })
  lastCheckedAtSteam: Date;

  /**
   * User tracks these accounts
   */
  @ManyToMany(() => Player, (player) => player.trackedBy)
  tracks: Player[];

  @OneToOne(() => UserSettings, { cascade: true, eager: true })
  @JoinColumn()
  settings: UserSettings;

  @ManyToMany(() => Player, (player) => player.followedBy)
  follows: Player[];

  @OneToMany(() => Notification, (notification) => notification.user)
  notifications: Notification[];

  /**
   * Matches the user has played in
   */
  @ManyToMany(() => Match)
  playedInMatch: Match[];

  @OneToMany(() => CustomTheme, (theme) => theme.user)
  themes: Record<string, unknown>[];
}
